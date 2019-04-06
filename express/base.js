class BaseController {
  constructor(app) {
    this.app = app;
  }

  render(res, view, params = {}) {
    res.render(`page/${view}`, { terms: { ...this.app.config.get(), ...params } });
  }

  error(res, { message }) {
    this.render(res, 'error', { message });
  }
}

module.exports = BaseController;
