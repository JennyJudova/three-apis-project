/* eslint-disable react/no-array-index-key */
/* eslint-disable no-eval */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecipeShow(props) {
  const [recipe, setRecipe] = useState();
  const [nutrition, setNutrition] = useState();
  const [category, setCategory] = useState();
  const [ingredients, setIngredients] = useState({});
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

  const getNutrition = () => {
    const ingrUpdate = [];
    for (let i = 1; i < 21; i += 1) {
      const strMeasure = `recipe.strMeasure${i}`;
      const strIngredient = `recipe.strIngredient${i}`;
      console.log(eval(strMeasure), eval(strIngredient));
      ingrUpdate.push(`${eval(strMeasure)} ${eval(strIngredient)}`);
      if (eval(strMeasure) === '') {
        i = 22;
        ingrUpdate.pop();
      }
    }
    const ingredientsUpdated = { ...ingredients, ingr: ingrUpdate };
    setIngredients(ingredientsUpdated);
    console.log(ingredientsUpdated);
    const { YOUR_APP_ID } = process.env;
    const { YOUR_APP_KEY } = process.env;
    axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`,
        ingredientsUpdated
      )
      .then((res) => {
        console.log('getNutrition res data', res.data);
        setNutrition(res.data);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  const getData = () => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log(res.data.meals[0]);
        setRecipe(res.data.meals[0]);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  const getCategory = () => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`
      )
      .then((res) => {
        console.log(res.data.meals);
        setCategory(res.data.meals);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  useEffect(() => {
    if (!recipe) getData();
    if (recipe) getNutrition();
    if (recipe) getCategory();
  }, [recipe]);

  return (
    <div className="showWrapper">
      {recipe && (
        <div>
          <h2>{recipe.strMeal}</h2>
          <img
            src={
              recipe.strMealThumb
                ? recipe.strMealThumb
                : 'https://i.pinimg.com/originals/d1/b0/e2/d1b0e2ee4beb712ccff7065cb43f65ed.jpg'
            }
            alt="recipe"
          />
          <p>
            <a href={recipe.strYoutube}>Watch how to make it.</a>
          </p>
          <p>Type of food: {recipe.strCategory}</p>
          {ingredients.ingr && (
            <div>
              <h3>Ingredients</h3>
              <ul>
                {ingredients.ingr.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          {nutrition && (
            <div>
              <h3>Nutrition</h3>
              <ul>
                <li>
                  {nutrition.totalNutrientsKCal.ENERC_KCAL.label}{' '}
                  {nutrition.totalNutrientsKCal.ENERC_KCAL.quantity}{' '}
                  {nutrition.totalNutrientsKCal.ENERC_KCAL.unit} % Daily Value*{' '}
                  {nutrition.totalDaily.ENERC_KCAL.quantity}{' '}
                  {nutrition.totalDaily.ENERC_KCAL.unit}
                </li>
                <li>
                  {nutrition.totalNutrientsKCal.PROCNT_KCAL.label}{' '}
                  {nutrition.totalNutrientsKCal.PROCNT_KCAL.quantity}{' '}
                  {nutrition.totalNutrientsKCal.PROCNT_KCAL.unit}
                </li>
                <li>
                  {nutrition.totalNutrientsKCal.FAT_KCAL.label}{' '}
                  {nutrition.totalNutrientsKCal.FAT_KCAL.quantity}{' '}
                  {nutrition.totalNutrientsKCal.FAT_KCAL.unit}
                </li>
                <li>
                  {nutrition.totalNutrientsKCal.CHOCDF_KCAL.label}{' '}
                  {nutrition.totalNutrientsKCal.CHOCDF_KCAL.quantity}{' '}
                  {nutrition.totalNutrientsKCal.CHOCDF_KCAL.unit}
                </li>
                <li>
                  Total Fat {nutrition.totalNutrients.FAT.quantity}{' '}
                  {nutrition.totalNutrients.FAT.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.FAT.quantity}{' '}
                  {nutrition.totalDaily.FAT.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.FASAT.label} Fat{' '}
                  {nutrition.totalNutrients.FASAT.quantity}{' '}
                  {nutrition.totalNutrients.FASAT.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.FASAT.quantity}{' '}
                  {nutrition.totalDaily.FASAT.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.FATRN.label} Fat{' '}
                  {nutrition.totalNutrients.FATRN.quantity}{' '}
                  {nutrition.totalNutrients.FATRN.unit}
                </li>
                <li>
                  Total Carbohydrate {nutrition.totalNutrients.CHOCDF.quantity}{' '}
                  {nutrition.totalNutrients.CHOCDF.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.CHOCDF.quantity}{' '}
                  {nutrition.totalDaily.CHOCDF.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.SUGAR.label}{' '}
                  {nutrition.totalNutrients.SUGAR.quantity}{' '}
                  {nutrition.totalNutrients.SUGAR.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.CHOLE.label}{' '}
                  {nutrition.totalNutrients.CHOLE.quantity}{' '}
                  {nutrition.totalNutrients.CHOLE.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.CHOLE.quantity}{' '}
                  {nutrition.totalDaily.CHOLE.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.NA.label}{' '}
                  {nutrition.totalNutrients.NA.quantity}{' '}
                  {nutrition.totalNutrients.NA.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.NA.quantity}{' '}
                  {nutrition.totalDaily.NA.unit}
                </li>
                <li>
                  {nutrition.totalNutrients.PROCNT.label}{' '}
                  {nutrition.totalNutrients.PROCNT.quantity}{' '}
                  {nutrition.totalNutrients.PROCNT.unit}% Daily Value*{' '}
                  {nutrition.totalDaily.PROCNT.quantity}{' '}
                  {nutrition.totalDaily.PROCNT.unit}
                </li>
              </ul>
            </div>
          )}
          <p>{recipe.strInstructions}</p>
          {category && (
            <div>
              <h3>Similar recipes</h3>
              <ul>
                {category.slice(0, 5).map((recipeName, index) => (
                  <li key={index}>
                    <img src={recipeName.strMealThumb} alt="recipe" />
                    {recipeName.strMeal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
