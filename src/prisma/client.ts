import { PrismaClient } from "@prisma/client"

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

// prisma.$use(async (params, next) => {
//   const before = Date.now()
//   const result = await next(params)
//   const after = Date.now()
//   console.log(
//     "\x1b[32m",
//     `Query ${params.model}.${params.action} took ${after - before}ms`,
//     "\x1b[37m"
//   )

//   return result
// })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
