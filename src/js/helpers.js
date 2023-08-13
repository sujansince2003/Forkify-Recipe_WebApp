import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchda = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchda, timeout(`${TIMEOUT_SEC}`)]); //promise.race is inbuilt function this takes promises and give which resolves faster
    //0.5 sec ma fetch huna na sakey timeout function execute hunxa
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err; //doing this the error will be handled by model js i.e module in which this is exported
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(`${TIMEOUT_SEC}`)]); //promise.race is inbuilt function this takes promises and give which resolves faster
//     //0.5 sec ma fetch huna na sakey timeout function execute hunxa
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${recipedata.message}`);
//     return data;
//   } catch (err) {
//     throw err; //doing this the error will be handled by model js i.e module in which this is exported
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const res = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(`${TIMEOUT_SEC}`),
//     ]); //promise.race is inbuilt function this takes promises and give which resolves faster
//     //0.5 sec ma fetch huna na sakey timeout function execute hunxa
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${recipedata.message}`);
//     return data;
//   } catch (err) {
//     throw err; //doing this the error will be handled by model js i.e module in which this is exported
//   }
// };
