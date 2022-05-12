// import fs from "fs"
// import { prisma } from "./client"

// const deleteAll = async () => {
//   await prisma.user.deleteMany()
// }

// const createUsers = async () => {
//   await prisma.user.create({
//     data: {
//       id: "3fa5a38b-e8fc-41a7-95d0-04f438ec3ff3",
//       email: "pannicope@gmail.com",
//       name: "Henry",
//       admin: true,
//       passwordHash:
//         "$2b$10$7f2Zo6SqU6E7r./LmGDkSOsQNSpcGTRiIKHpx/.ZK0G7sxTXskXsq",
//       stripeId: "cus_JifnHyNvFpbJIx",
//       ff: true,
//       pp: false,
//       kotc: false,
//     },
//   })
// }

// const main = async () => {
//   const args = process.argv.slice(2)
//   const reset = args.includes("--reset")

//   if (reset) {
//     console.log("Resetting database")
//     await deleteAll()
//     return
//   }

//   console.log("Seeding database")

//   await deleteAll()
//   // await createUsers()

//   const json = fs.readFileSync("../../temp/users/old.json", "utf8")
//   const old = JSON.parse(json)

//   console.log(old[0])
//   console.log(old.length)

//   const n = old.map((item: any) => ({
//     name: item.name,
//     email: item.email,
//     passwordHash: item.passwordHash,
//     ff: item.footworkFastlane,
//     pp: item.powerPathway,
//     kotc: item.kotc,
//     admin: true,
//   }))

//   await prisma.user.createMany({ data: n })
//   await prisma.user.update({
//     where: { email: "pannicope@gmail.com" },
//     data: {
//       admin: true,
//     },
//   })
// }

// main().catch((e) => {
//   throw e
// })
