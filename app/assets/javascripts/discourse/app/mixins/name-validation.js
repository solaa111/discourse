import EmberObject, { computed } from "@ember/object";
import Mixin from "@ember/object/mixin";
import { isEmpty } from "@ember/utils";
import I18n from "discourse-i18n";

export default Mixin.create({
  get nameTitle() {
    return I18n.t(
      this.siteSettings.full_name_required
        ? "user.name.title"
        : "user.name.title_optional"
    );
  },

  // Validate the name.
  nameValidation: computed("accountName", "forceValidationReason", function () {
    const { accountName, forceValidationReason } = this;
    if (this.siteSettings.full_name_required && isEmpty(accountName)) {
      return EmberObject.create({
        failed: true,
        ok: false,
        message: I18n.t("user.name.required"),
        reason: forceValidationReason ? I18n.t("user.name.required") : null,
        element: document.querySelector("#new-account-name"),
      });
    }

    return EmberObject.create({ ok: true });
  }),
});
