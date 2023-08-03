import { useCategories } from "../contexts/CategoriesContext";
import CategoryCard from "./CategoryCard";

export default function TotalCategoryCard(props) {
    const { expenses, categories } = useCategories()
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = categories.reduce((total, category) => total + category.max, 0)


    if(max === 0) return null


  return (
    <CategoryCard amount={amount} name="Total" gray max={max} hideButtons/>
  )
}
