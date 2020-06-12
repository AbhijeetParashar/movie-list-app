export default function (state = null, action) {
  switch (action.type) {
    case "movieDetailedList":
      return {
        type: action.type,
        data: action.payload,
      };
  }
  return state;
}
