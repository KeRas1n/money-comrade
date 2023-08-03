import { OTHER_BUDGET_ID, useCategories } from "../contexts/CategoriesContext";
import CategoryCard from "./CategoryCard";

export default function OtherCategoryCard(props) {
    const { getCategoryExpenses } = useCategories()
    const amount = getCategoryExpenses(OTHER_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)


    if(amount === 0) return null


  return (
    <CategoryCard amount={amount} name="Other" gray {...props} />
  )
}
