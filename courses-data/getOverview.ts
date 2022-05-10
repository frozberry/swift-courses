import { User } from "@prisma/client"
import { CourseOverview } from "../src/lib/types"

const getCoursesOverview = (user: User): CourseOverview[] => [
  {
    name: "Footwork Fastlane",
    description:
      "The A-Z footwork course to get you moving to all 6 corners of the court with blinding speed and accuracy.",
    img: "/ff.png",
    lockedImg: "/ff-locked.png",
    link: "/ff",
    owned: user.ff,
    code: "ff",
  },
  {
    name: "Power Pathway",
    description: "Learn to super-charge your smash and dominate your opponent.",
    img: "/pp.png",
    lockedImg: "/pp-locked.png",
    link: "/pp",
    owned: user.pp,
    code: "pp",
  },
  {
    name: "King of the Court",
    description:
      "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
    img: "/kotc.png",
    lockedImg: "/kotc-locked.png",
    link: "/kotc",
    owned: user.kotc,
    code: "kotc",
  },
]
export default getCoursesOverview
