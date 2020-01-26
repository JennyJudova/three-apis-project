/* eslint-disable no-eval */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecipeShow(props) {
  const [recipe, setRecipe] = useState();
  const [nutrition, setNutrition] = useState();
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

  // const fileDataUpdated = fileData.map((object) => {
  //   const objectUpdate = { ...object };
  //   if (object.status === 'scheduled' && object.isChecked === true) {
  //     scheduledUpdated.push(object.device);
  //     objectUpdate.isChecked = false;
  //     selectedUpdated -= 1;
  //   }
  //   setSelectedCount(selectedUpdated);
  //   setScheduled(scheduledUpdated);
  //   return objectUpdate;
  // });

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

    console.log(ingrUpdate);

    let ingredients = {};
    ingredients = { ...ingredients, ingr: ingrUpdate };
    console.log(ingredients);

    const { YOUR_APP_ID } = process.env;
    const { YOUR_APP_KEY } = process.env;
    // const ingredients = {
    //   ingr: [
    //     `${recipe.strMeasure1} ${recipe.strIngredient1}`,
    //     `${recipe.strMeasure2} ${recipe.strIngredient2}`,
    //     `${recipe.strMeasure3} ${recipe.strIngredient3}`,
    //     `${recipe.strMeasure4} ${recipe.strIngredient4}`,
    //     `${recipe.strMeasure5} ${recipe.strIngredient5}`,
    //     `${recipe.strMeasure6} ${recipe.strIngredient6}`,
    //     `${recipe.strMeasure7} ${recipe.strIngredient7}`,
    //     `${recipe.strMeasure8} ${recipe.strIngredient8}`,
    //     `${recipe.strMeasure9} ${recipe.strIngredient9}`,
    //     `${recipe.strMeasure10} ${recipe.strIngredient10}`
    //   ]
    // };
    // console.log(ingredients);

    axios
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`,
        ingredients
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
          <p>{recipe.strInstructions}</p>
          <p>{recipe.bio}</p>
        </div>
      )}
    </div>
  );
}

// {recipe.plans.length > 0 && (
//   <div>
//     <h3>Plans</h3>
//     <div className="villainPlans">
//       {recipe.plans.map((plan) => (
//         <div key={plan._id}>
//           <img src={plan.image} alt="Plan" height="100px" />
//           <p>{plan.name}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
