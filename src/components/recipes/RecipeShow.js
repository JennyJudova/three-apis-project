/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VillainShow(props) {
  const [recipe, setRecipe] = useState();
  const [errors, setErrors] = useState();
  const { id } = props.match.params;

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

  // https://api.edamam.com/api/nutrition-details?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}

  useEffect(() => {
    getData();
  }, []);

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
