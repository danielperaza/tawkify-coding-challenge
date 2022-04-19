import type { NextApiRequest, NextApiResponse } from 'next'
import { accessSync, constants, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const dbFile = resolve('/tmp/db.json')

const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    accessSync(dbFile, constants.F_OK)
    res.status(200).json(readFileSync(dbFile).toString())
  } catch (error) {
    res.status(200).json([])
  }
}

const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
  if (!Array.isArray(req.body)) {
    res.status(400).json({error: 'Invalid request payload'})
  }
  writeFileSync(dbFile, JSON.stringify(req.body))
  res.status(200).json({ success: true })
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method?.toUpperCase()) {
    case 'GET': handleGet(req, res)
    break
    case 'POST': handlePost(req, res)
    break
    default:
      res.status(401)
  }
}
