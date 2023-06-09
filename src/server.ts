/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  errorLogger.error('👹🐱‍🏍 uncaughtException is detected', error)
  process.exit(1)
})

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to MongoDB')
    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect to MongoDB', err)
  }

  process.on('unhandledRejection', error => {
    console.log(
      '👹🐱‍🏍 unhandledRejection is detected, we are closing our server'
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

// console.log(x)

process.on('SIGTERM', () => {
  logger.info('👹🐱‍🏍 SIGTERM RECEIVED. Shutting down gracefully')
  if (server) {
    server.close(() => {
      logger.info('👹🐱‍🏍 Process terminated')
    })
  } else {
    process.exit(1)
  }
})
