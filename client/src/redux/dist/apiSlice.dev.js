"use strict";

var _react = require("@reduxjs/toolkit/query/react");

var _AdministradorSlice = require("./AdministradorSlice");

var baseQuery = (0, _react.fetchBaseQuery)({
  baseUrl: 'https://backend-production-e99b.up.railway.app/',
  credentials: 'include',
  prepareHeaders: function prepareHeaders(headers, _ref) {
    var getState = _ref.getState;
    var token = getState().auth.token;

    if (token) {
      headers.set("authorization", "Bearer ".concat(token));
    }

    return headers;
  }
});