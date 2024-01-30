# API Documentation for Dementia and MCI Detection

## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Workflow](#workflow)
    - [Submitting a Recording](#submitting-a-recording)
    - [Awaiting Results](#awaiting-results)
- [Response Structure](#response-structure)
- [Interpreting the result](#interpreting-the-is_ill_score)
- [Security and Authorization](#security-and-authorization)
- [Support and Contact](#support-and-contact)


## Introduction

This document provides a comprehensive guide for integrating with the Spectrum Insights API, designed to detect symptoms of dementia and Mild Cognitive Impairment (MCI) based on a 6-second voice recording. The document details the process of submitting recordings, awaiting results, and interpreting the returned data.

## Requirements

- A 6-second audio recording in .wav format.
- A valid Bearer Token for authorization.

## Workflow

### Submitting a Recording

**Endpoint:**
```
POST https://masterhandlerapi.spectruminsights.net/api/recording/recording
```

**Description:** Submit a .wav format recording. Receive a unique recording ID in response.

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Body:**
- .wav file containing the recording.

**Example Request:**
```
POST /api/recording/recording/ HTTP/1.1
Host: masterhandlerapi.spectruminsights.net
Authorization: Bearer YOUR_TOKEN
Content-Type: audio/wav

[Binary Audio Data]
```
**Example Response:**
```json
{
  "recording_id": "12345",
  "status": "recording_submitted"
}
```

### Awaiting Results

**Endpoint:**
```
GET https://masterhandlerapi.spectruminsights.net/api/recording/recording/api/recording/recording/{id}`
```
**Description:**

Periodically query this endpoint, replacing `{id}` with the received recording ID, until the status changes to `results_ready`.

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Example Request:**
```
GET /api/recording/recording/12345 HTTP/1.1
Host: masterhandlerapi.spectruminsights.net
Authorization: Bearer YOUR_TOKEN
```

**Example Response:**
```json
{
  "recording_id": "12345",
  "created_date": "2024-01-22T15:30:00Z",
  "is_ill": false,
  "is_ill_proba": 0.05,
  "is_ill_score": 9,
  "status": "results_ready",
  "wav_file_duration": 5.989206349206349,
  "wav_sampling_rate": 44100,
  "num_sound_objects": 59854,
  "num_points": 379452,
  "num_samples": 266398,
  "amp_plot_file_path": "https://masterhandlerapi.spectruminsights.net/api/recording/recording/12345/amp_plot",
  "tone_plot_file_path": "https://masterhandlerapi.spectruminsights.net/api/recording/recording/12345/tone_plot",
  "phase_plot_file_path": "https://masterhandlerapi.spectruminsights.net/api/recording/recording/12345/phase_plot",
  "diagnosis_explainers": [
    {
      "name": "Amplitude – Standard Deviation",
      "value": 0.0,
      "definition": "Amplitude – Standard Deviation",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Amplitude – Shimmer",
      "value": 0.0,
      "definition": "Amplitude – Shimmer",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Amplitude – Lean",
      "value": 0.0,
      "definition": "Amplitude – Lean",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Frequency – Standard Deviation",
      "value": 0.0,
      "definition": "Frequency – Standard Deviation",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Frequency – Jitter",
      "value": 0.791439,
      "definition": "Frequency – Jitter",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Frequency - Lean",
      "value": 0.0,
      "definition": "Frequency - Lean",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Phase – Standard Deviation",
      "value": 10.0,
      "definition": "Phase – Standard Deviation",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Phase – Drift",
      "value": 10.0,
      "definition": "Phase – Drift",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Sound Objects / Harmonics",
      "value": 4.0875,
      "definition": "Sound Objects / Harmonics",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Low Harmonics Energy",
      "value": 0.0,
      "definition": "Low Harmonics Energy",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Sub Harmonics Energy",
      "value": 0.0,
      "definition": "Sub Harmonics Energy",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Harmonic to Noise Ratio",
      "value": 0.0,
      "definition": "Harmonic to Noise Ratio",
      "min_value": 0,
      "max_value": 10
    },
    {
      "name": "Harmonics Tilt",
      "value": 10.0,
      "definition": "Harmonics Tilt",
      "min_value": 0,
      "max_value": 10
    }
  ]
}
```

## Response Structure

Each submission and status query will return a JSON response containing:

- `recording_id`: Unique recording identifier.
- `created_date`: Recording creation date and time.
- `is_ill`: Indication of illness presence.
- `is_ill_proba`: Probability of illness presence.
- `is_ill_score`: A score based on which health status is determined.
- `status`: Current status of the recording.
- `wav_file_duration`: The total duration of the audio file in seconds.
- `wav_sampling_rate`: The number of samples per second in the audio file.
- `num_sound_objects`: Represents the count of distinct sound objects identified in the audio.
- `num_points`: The total number of data points in the audio analysis.
- `amp_plot_file_path`: The path to an image that visualizes the amplitude analysis of the audio recording.
- `tone_plot_file_path`: The path to an image that visualizes the frequency analysis of the audio recording.
- `phase_plot_file_path`: The path to an image that provides a visual representation of the phase analysis of the audio recording.
- `num_samples`: This indicates the total number of audio samples analyzed.
- `diagnosis_explainers`: A field in the response provides an array of objects, each representing a different aspect of the audio analysis. This field is crucial for understanding the characteristics of the audio sample and their implications for diagnosis. Each object within the array contains the following properties:
  - `name`: The name of the metric being measured.
  - `value`: The quantified value of the metric, ranging from 0 (indicating a potential issue) to 10 (indicating a healthy or normal state).
  - `definition`: A brief description of the metric.
  - `min_value`: The minimum possible value for this metric.
  - `max_value`: The maximum possible value for this metric.

#### Detailed Descriptions of `diagnosis_explainers` Metrics
- `Frequency – Standard Deviation`: Shows how much the pitch of the sound changes in the recording. Higher values indicate greater pitch changes.
- `Frequency – Jitter`: Measures the instability of pitch in the recording. Higher values indicate larger pitch variations.
- `Frequency - Lean`: Indicates the overall tendency of pitch changes in the recording, measured in short segments.
- `Phase – Standard Deviation`: Measures the desynchronization between the fundamental frequency and harmonics. Higher values indicate greater desynchronization.
- `Phase – Drift`: Shows the speed of changes in desynchronization between the fundamental frequency and harmonics.
- `Sound Objects / Harmonics`: Indicates the average number of sound objects contributing to the harmonic. A lower number signifies a more uniform sound.
- `Low Harmonics Energy`: Measures how much sound energy is in the low harmonics.
- `Sub Harmonics Energy`: Shows how much sound energy is in subharmonics, often indicating disturbances in the signal.
- `Harmonic to Noise Ratio`: The ratio of pure sound to noise, including sounds like rustles produced by the patient.
- `Harmonics Tilt`: A parameter showing how evenly the energy of the voice is distributed among different pitches. If the energy is evenly distributed, the graph will be flat. In individuals with speech issues, energy often concentrates in one place, causing the graph to tilt up or down.

#### Possible response statuses:

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

For technical issues or questions regarding integration, please contact our technical support team at [Email Address](mailto:contact@vividmind.health)

---


*Note: This documentation is intended for clients aiming to integrate the Spectrum Insights API for dementia and MCI diagnostics. Please thoroughly test all functionalities in a development environment before deploying in a production setting.*