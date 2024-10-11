"use server"

import { db } from "@/lib/db"

export async function postImage(url: string, prompt: string) {
  const image = await db.images.create({
    data: {
      url,
      prompt
    }
  })

  return image
}

export async function getImageByUrl(url: string) {
  const image = await db.images.findUnique({
    where: {
      url
    }
  })

  return image
}

export async function getImages() {
  // Sorted by newest first
  const images = await db.images.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return images
}