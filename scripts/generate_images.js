const cheerio = require("cheerio");
const fs = require("fs");

const modifySvg = (src, target, modificationCallback) => {
  const $ = cheerio.load(fs.readFileSync(src), null, false);

  modificationCallback($);

  fs.writeFile(target, $.xml(), (err) => {
    if (err) throw err;
    console.log("File " + target + " was saved");
  });
};

modifySvg(
  "modules/ROOT/assets/images/general/ecosystem.svg",
  "modules/ROOT/assets/images/generated/ecosystem_highlight_machine.svg",
  ($) => {
    $("defs").after(
      "<g>" +
        // box around "machine"
        '<rect x="50" y="60" width="350" height="200" stroke="#ff0000" stroke-width="7.0" fill="rgba(0,0,0,0)"></rect>' +
        // box around "CU"
        '<rect x="700" y="370" width="300" height="250" stroke="#ff0000" stroke-width="7.0" fill="rgba(0,0,0,0)"></rect>' +
        "</g>"
    );
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/ecosystem.svg",
  "modules/ROOT/assets/images/generated/ecosystem_highlight_telemetryplattform.svg",
  ($) => {
    $("svg").append(
      "<g>" +
        // box around "telemetry plattform"
        '<rect x="30" y="260" width="600" height="360" stroke="#ff0000" stroke-width="7.0" fill="rgba(0,0,0,0)"></rect>' +
        "</g>"
    );
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/ecosystem.svg",
  "modules/ROOT/assets/images/generated/ecosystem_highlight_app.svg",
  ($) => {
    $("svg").append(
      "<g>" +
        // box around "app instances
        '<rect x="900" y="5" width="370" height="440" stroke="#ff0000" stroke-width="7.0" fill="rgba(0,0,0,0)"></rect>' +
        "</g>"
    );
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/endpoint.svg",
  "modules/ROOT/assets/images/generated/endpoint_highlight_inbox.svg",
  ($) => {
    $("#rect10146").css("stroke", "#ff0000").css("stroke-width", "7");
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/endpoint.svg",
  "modules/ROOT/assets/images/generated/endpoint_highlight_outbox.svg",
  ($) => {
    $("#rect10150").css("stroke", "#ff0000").css("stroke-width", "7");
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/endpoint.svg",
  "modules/ROOT/assets/images/generated/endpoint_highlight_feed.svg",
  ($) => {
    $("#rect10110").css("stroke", "#ff0000").css("stroke-width", "7");
  }
);

modifySvg(
  "modules/ROOT/assets/images/general/endpoint.svg",
  "modules/ROOT/assets/images/generated/endpoint_highlight_subscription.svg",
  ($) => {
    $("#rect10220").css("stroke", "#ff0000").css("stroke-width", "7");
  }
);
