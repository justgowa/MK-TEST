export function UserAgreement(link) {
  this.element = document.querySelector(link);
  this.isUserAgree = false;
  this.toggle = this.toggle.bind(this);
  this.element.checked = this.isUserAgree;
}

UserAgreement.prototype = {
  getValue: function() {
    return this.isUserAgree;
  },

  toggle: function() {
    this.element.checked = this.isUserAgree = !this.isUserAgree;
    console.log(this.getValue());
  }
};
