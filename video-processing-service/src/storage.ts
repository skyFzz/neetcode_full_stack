// 1. GCS file interactions
// 2. Local file interactions

import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

const storage = new Storage();

const rawVideoBucketName = "zhl-yt-raw-videos";     // where we are going to download the raw videos
const processedVideoBucketName = "zhl-yt-processed-videos";     // after we are done processing we are going to upload to this bucket

const localRawVideoPath = "./raw-videos";   // when we download, we are going to put them in this file system
const localProcessedVideoPath = "./processed-videos";   // when we process

/**
 * Creates the local directories for raw and processed videos.
 */
export function setupDirectories() {

}

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        // Converting the video
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360") // 360p
        .on("end", () => {
            console.log("Processing finished successfully.")
            resolve()
        })
        .on("error", (err) => {
            console.log(`An error occurred: ${err.message}`)
            reject(err)
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`)
    })
    
}

/**
 * @param fileName - The name of the file to download from the
 * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
 * @returns A promise that resolves when the file has been downloaded.
 * Because the functioin is async, it has to return a promise
 */
export async function downloadRawVideo(fileName: string) {
    // Block any code until this await block finished executing
    // 'await' expressions are only allowed within async functions and at the top levels of modules.
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({ destination: `${localProcessedVideoPath}/${fileName}` })

    console.log()
}

/**
 * @param fileName - The name of the file to upload from the
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
 * @returns A promise that resolves when the file has been uploaded.
 */
export async function uploadProcessedVideo(fileName: string) {

}