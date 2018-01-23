export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'tabs';
  const attrTabs = config.attrTabs;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tabs',
        script() {
          console.log('its a tab', this);
        },
        ...config.tabsProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[config.attrTabs] = 1;
        this.setAttributes(attrs);
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrTabs)) {
          return { type };
        }
      },
    }),

    view: defaultView.extend({
      init() {
        const comps = this.model.components();

        // Add a basic template if it's not yet initialized
        !comps.length && comps.add(config.template);
      }
    })
  });
}
