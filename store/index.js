export const state = () => ({
  // content
  settings: null,
  content: {
    menu: null,
    movies: []
  }
});

export const mutations = {
  SET_HOSTNAME(state, data) {
    state.hostname = data;
  },
  SET_SETTINGS(state, settings) {
    state.settings = settings;
  },
  SET_MENU(state, menu) {
    state.content.menu = menu;
  },
  SET_MOVIES(state, movies) {
    state.content.movies = movies;
  }
};

export const actions = {
  /**
   * nuxtServerInit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async nuxtServerInit({ dispatch }) {
    await dispatch('getSettings');
    await dispatch('getMenuContent');
    await dispatch('getMovies');
  },

  async getSettings({ state, commit }) {
    const settings = require('~/content/settings/settings.json');
    commit('SET_SETTINGS', settings);
    commit('SET_HOSTNAME', settings.hostname ? settings.hostname : '');
  },

  async getMenuContent({ state, commit }) {
    const menu = require('~/content/menu/menu.json');
    // console.log({ menu });
    commit('SET_MENU', menu);
  },

  async getMovies({ state, commit }) {
    const context = await require.context('~/content/movies/', false, /\.json$/);
    const movies = await context.keys().map(key => ({
      ...context(key),
      _path: `/works/${key.replace('.json', '').replace('./', '')}`,
      _slug: `${key.replace('.json', '').replace('./', '')}`
    }));

    commit('SET_MOVIES', movies);
  }

};