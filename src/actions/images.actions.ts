"use server"

import { db } from "@/lib/db"

export async function postImage (url: string) {
  const image = await db.images.create({
    data: {
      url
    }
  })

  return image
}

export async function getImages () {
  // Sorted by newest first
  const images = await db.images.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return images
}