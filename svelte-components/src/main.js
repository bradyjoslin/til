import ScrollSnapper from "./ScrollSnapper.svelte";

let containers = [ScrollSnapper];

function generateComponent(component, target, props) {
  props.cfg.anchor != null
    ? new component({
        target: target,
        props: props,
        anchor: document.querySelector("#" + props.cfg.anchor),
      })
    : Object.keys(props.cfg).length === 0
    ? new component({
        target: target,
      })
    : new component({
        target: target,
        props: props,
      });
}

containers.forEach((c) => {
  document
    .querySelectorAll("#svelte-" + c["name"].toLowerCase())
    .forEach((target) => {
      if (target) {
        let cfg = target.dataset.cfg ? JSON.parse(target.dataset.cfg) : {};
        generateComponent(c, target, {
          cfg,
        });
      }
    });
});
