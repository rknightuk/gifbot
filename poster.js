import fs from 'fs'
import { createRestAPIClient } from 'masto'
import dotenv from 'dotenv'
dotenv.config()

export default async (botKey, filepath, description) => {
    const masto = createRestAPIClient({
        url: process.env.INSTANCE,
        accessToken: process.env[`${botKey}_TOKEN`],
    })

    const attachment = await masto.v2.media.create({
        file: new Blob([fs.readFileSync(filepath)]),
        description: description,
    })

    const status = await masto.v1.statuses.create({
        status: '',
        visibility: "public",
        mediaIds: [attachment.id],
    })

    return status
}
