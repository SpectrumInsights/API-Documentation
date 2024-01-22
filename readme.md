# API Documentation for Dementia and MCI Detection

## Introduction

This document provides a comprehensive guide for integrating with the Spectrum Insights API, designed to detect symptoms of dementia and Mild Cognitive Impairment (MCI) based on a 6-second voice recording. The document details the process of submitting recordings, awaiting results, and interpreting the returned data.

## Requirements

- A 6-second audio recording in .wav format.
- A valid Bearer Token for authorization.

## Workflow

### 1. Submitting a Recording

**Endpoint:** `POST https://masterhandlerapi.spectruminsights.net/api/recording/recording/`

**Description:** Submit a .wav format recording. Receive a unique recording ID in response.

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Body:**
- .wav file containing the recording.

### 2. Awaiting Results

**Endpoint:** `GET https://masterhandlerapi.spectruminsights.net/api/recording/recording/api/recording/recording/{id}`

**Description:** Periodically query this endpoint, replacing `{id}` with the received recording ID, until the status changes to `results_ready`.

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

## Response Structure

Each submission and status query will return a JSON response containing:

- `recording_id`: Unique recording identifier.
- `created_date`: Recording creation date and time.
- `is_ill`: Indication of illness presence.
- `is_ill_proba`: Probability of illness presence.
- `is_ill_score`: A score based on which health status is determined.

Possible response statuses:

- `recording_submitted`: The recording has been submitted.
- `processing_in_progress`: Processing of the recording is underway.
- `results_ready`: Results are ready for retrieval.
- `failed`: Processing failed.

## Interpreting the `is_ill_score`

The value of `is_ill_score` determines the diagnosis:

- **0-2**: Dementia
- **3-4**: Mild Cognitive Impairment (MCI)
- **5-10**: Healthy

## Security and Authorization

- All API requests must be authorized using a Bearer token.
- It is recommended to use HTTPS protocol for all requests to ensure data security.

## Support and Contact

For technical issues or questions regarding integration, please contact our technical support team.

---

*Note: This documentation is intended for clients aiming to integrate the Spectrum Insights API for dementia and MCI diagnostics. Please thoroughly test all functionalities in a development environment before deploying in a production setting.*