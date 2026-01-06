require('dotenv').config();
const { Worker } = require('bullmq')
const connection = require('./connection')

const worker = new Worker('webhook-tasks', async (job) => {
    console.log('Processing webhook task:', job.data)
}, { connection })

worker.run()
