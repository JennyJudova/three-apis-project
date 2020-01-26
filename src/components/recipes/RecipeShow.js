/* eslint-disable react/no-array-index-key */
/* eslint-disable no-eval */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecipeShow(props) {
  const [recipe, setRecipe] = useState();
  const [nutrition, setNutrition] = useState();
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

  useEffect(() => {
    if (!recipe) getData();
    if (recipe) getNutrition();
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
          <p>{recipe.strInstructions}</p>
          <p>{recipe.strYoutube}</p>
        </div>
      )}
    </div>
  );
}
