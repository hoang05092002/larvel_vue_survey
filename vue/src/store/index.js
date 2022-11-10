
import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurvey = [
  {
    id: 100,
    title: 'Survey 1',
    slug: 'Survey 1',
    status: 'draft',
    image: 'https://play-lh.googleusercontent.com/vTazlCxrxjmAIIdGv2vjFYhhKXksLT-Uq-poZrj1QakGNyEQinyZ9PTIOo3ZsTY_IA8',
    description: 'Test web',
    created_at: '',
    updated_at: '',
    expire_at: '',
    question: [
      {
        id: 1,
        type: 'select',
        question: "From which country are you ?",
        description: null,
        data: {
          options: [
            {
              uuid: "abc-1",
              text: "Vietnam"
            },
            {
              uuid: "abc-2",
              text: "Russian"
            },
            {
              uuid: "abc-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {
          options: [
            {
              uuid: "xyz-1",
              text: "Vietnam"
            },
            {
              uuid: "xyz-2",
              text: "Russian"
            },
            {
              uuid: "xyz-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 3,
        type: 'text',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
      {
        id: 2,
        type: 'textarea',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
    ]
  },
  {
    id: 200,
    title: 'Survey 1',
    slug: 'Survey 1',
    status: 'draft',
    image: 'https://play-lh.googleusercontent.com/vTazlCxrxjmAIIdGv2vjFYhhKXksLT-Uq-poZrj1QakGNyEQinyZ9PTIOo3ZsTY_IA8',
    description: 'Test web',
    created_at: '',
    updated_at: '',
    expire_at: '',
    question: [
      {
        id: 1,
        type: 'select',
        question: "From which country are you ?",
        description: null,
        data: {
          options: [
            {
              uuid: "abc-1",
              text: "Vietnam"
            },
            {
              uuid: "abc-2",
              text: "Russian"
            },
            {
              uuid: "abc-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {
          options: [
            {
              uuid: "xyz-1",
              text: "Vietnam"
            },
            {
              uuid: "xyz-2",
              text: "Russian"
            },
            {
              uuid: "xyz-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 3,
        type: 'text',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
      {
        id: 2,
        type: 'textarea',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
    ]
  },
  {
    id: 300,
    title: 'Survey 1',
    slug: 'Survey 1',
    status: 'draft',
    image: 'https://play-lh.googleusercontent.com/vTazlCxrxjmAIIdGv2vjFYhhKXksLT-Uq-poZrj1QakGNyEQinyZ9PTIOo3ZsTY_IA8',
    description: 'Test web',
    created_at: '',
    updated_at: '',
    expire_at: '',
    question: [
      {
        id: 1,
        type: 'select',
        question: "From which country are you ?",
        description: null,
        data: {
          options: [
            {
              uuid: "abc-1",
              text: "Vietnam"
            },
            {
              uuid: "abc-2",
              text: "Russian"
            },
            {
              uuid: "abc-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {
          options: [
            {
              uuid: "xyz-1",
              text: "Vietnam"
            },
            {
              uuid: "xyz-2",
              text: "Russian"
            },
            {
              uuid: "xyz-3",
              text: "China"
            }
          ]
        }
      },
      {
        id: 3,
        type: 'text',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
      {
        id: 2,
        type: 'textarea',
        question: "Which language videos do you want to see on my channel ?",
        description: "Nothing",
        data: {}
      },
    ]
  },
  {
    id: 400,
    title: 'Survey 1',
    slug: 'Survey 1',
    status: 'draft',
    image: 'https://play-lh.googleusercontent.com/vTazlCxrxjmAIIdGv2vjFYhhKXksLT-Uq-poZrj1QakGNyEQinyZ9PTIOo3ZsTY_IA8',
    description: 'Test web',
    created_at: '',
    updated_at: '',
    expire_at: '',
    question: []
  },
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurvey],
    questionTypes: ['text', 'select', 'textarea', 'checkbox', 'ratio'],
  },
  getters: {},
  actions: {
    async register({ commit }, user) {
      return await axiosClient.post('/register', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        })
    },

    async login({ commit }, user) {
      return await axiosClient.post('/login', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        })
    },

    async logout({ commit }) {
      return await axiosClient.post('/logout')
        .then(response => {
          commit('logout');
          return response;
        })
    },

    async saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = await axiosClient.put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit('updateSurvey', res.data);
            return res;
          });
      } else {
        response = await axiosClient.post(`/survey`, survey)
          .then((res) => {
            commit('saveSurvey', res.data);
            return res;
          });
      }

      return response;
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },

    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },

    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },

    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      })
    }
  },
  modules: {},
})

export default store;
