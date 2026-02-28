#!/usr/bin/env bash
set -euo pipefail

# Deploy a static build (Next export) to a Cloud Storage bucket for use with Cloud CDN.
# Requirements: gcloud CLI, gsutil, npm, and access to the target bucket/project.
#
# Usage:
#   PROJECT_ID="my-project" BUCKET="my-bucket" REGION="us-central1" ./deploy.sh
#   # PROJECT_ID is optional if gcloud is already set; BUCKET is required.
#
# Notes:
# - Bucket must be globally unique. Script will create it if it does not exist.
# - Outputs to ./app/out via `next export`.

PROJECT_ID="${PROJECT_ID:-emm-blue}"
BUCKET="${BUCKET:-emm-blue}"
REGION="${REGION:-us-east1}"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/app"
BUILD_DIR="${APP_DIR}/out"

if [[ -z "${BUCKET}" ]]; then
  echo "BUCKET is required. Example: BUCKET=my-bucket ./deploy.sh" >&2
  exit 1
fi

cd "${APP_DIR}"

echo "Installing deps..."
npm ci

echo "Building (next build + export)..."
npm run build

if [[ -n "${PROJECT_ID}" ]]; then
  echo "Setting gcloud project: ${PROJECT_ID}"
  gcloud config set project "${PROJECT_ID}"
fi

echo "Ensuring bucket gs://${BUCKET} exists..."
if ! gsutil ls -b "gs://${BUCKET}" >/dev/null 2>&1; then
  gsutil mb -p "${PROJECT_ID:-$(gcloud config get-value project)}" -l "${REGION}" -b on "gs://${BUCKET}"
fi

echo "Uploading static site..."
gsutil -m rsync -r -d "${BUILD_DIR}" "gs://${BUCKET}"

echo "Setting cache headers..."
# HTML: no-cache so changes show quickly
gsutil -m setmeta -h "Cache-Control:no-cache" "gs://${BUCKET}/**/*.html" || true
# Assets: long-lived cache
gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" \
  "gs://${BUCKET}/**/*.js" "gs://${BUCKET}/**/*.css" \
  "gs://${BUCKET}/**/*.png" "gs://${BUCKET}/**/*.jpg" "gs://${BUCKET}/**/*.jpeg" \
  "gs://${BUCKET}/**/*.webp" "gs://${BUCKET}/**/*.avif" "gs://${BUCKET}/**/*.gif" \
  "gs://${BUCKET}/**/*.svg" "gs://${BUCKET}/**/*.ico" || true

echo "Setting website config (index/404)..."
gsutil web set -m index.html -e 404.html "gs://${BUCKET}"

echo "Done. Next step: attach Cloud CDN to this bucket (or a backend bucket) in Cloud Console or via gcloud."
