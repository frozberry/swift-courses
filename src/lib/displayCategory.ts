import { Category } from "@prisma/client"

const displayCategory = (category: Category) => {
  switch (category) {
    case Category.NUMBERS:
      return "numbers"
    case Category.ADDITION_SUBTRACTION:
      return "addition and subtraction"
    case Category.MULTIPLICATION_DIVISION:
      return "multiplcation and division"
    case Category.FRACTIONS:
      return "fractions"
    case Category.MEASUREMENT:
      return "measurement"
    case Category.GEOMETRY:
      return "geometry"
    case Category.STATISTICS:
      return "statistics"
    case Category.RATIO_PROPORTION:
      return "ration and proportion"
    case Category.ALGEBRA:
      return "algebra"
    default:
      throw new Error("Unknown category")
  }
}

export default displayCategory
