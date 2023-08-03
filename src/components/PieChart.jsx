import React from "react";
import { Chart } from "react-google-charts";
import {OTHER_BUDGET_ID, useCategories } from "../contexts/CategoriesContext";

export const options = {
  //title: "My Daily Activities",
  pieHole: 0.8,
  legend: "bottom",
  pieSliceText: "none",
  backgroundColor: 'transparent',
};

export function PieChart() {

    const {categories, getCategoryExpenses}  = useCategories()
    const data = [['Task', "Hours per Day"], ['Other', getCategoryExpenses(OTHER_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)]]

    categories.map(category => {
        const amount = getCategoryExpenses(category.id).reduce((total, expense) => total + expense.amount, 0)
        const name = category.name
        data.push([name, amount])
    })


    return (
        <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"300px"}
     />
    );
}
