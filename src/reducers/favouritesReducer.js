export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
};

export const LOCAL_STORAGE_KEY = 'celebrare_photo_favourites';

export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = String(action.payload);
      const isAlreadyFavourite = state.includes(photoId);

      if (isAlreadyFavourite) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }
    default:
      return state;
  }
}

export function initFavourites() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage:', error);
    return [];
  }
}
