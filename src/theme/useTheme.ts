const colors = {
  background: '#222',
  background_secondary: '#666',
  text_primary: '#eee',
  text_secondary: '#ccc',
  text_default: '#efefef',

  primary: '#eee',
  secondary: '#ddd'
};

const variables = {
  themeColor: colors.background,

  backgroundColor: colors.background,

  logoPrimaryColor: colors.text_primary,
  logoSecondaryColor: colors.text_secondary,

  iconColor: colors.primary,
  iconColorHovered: colors.primary,

  clockHourColor: colors.primary,
  clockMinuteColor: colors.primary,
  clockSecondColor: colors.primary,
  clockYearColor: colors.primary,
  clockMonthColor: colors.primary,
  clockDoubleCronColor: colors.secondary,

  clockDateColor: colors.primary,
  clockDayColor: colors.primary,

  dialogBackgroundColor: colors.background,
  dialogBorderColor: colors.text_primary,
  dialogHeadingColor: colors.text_primary,
  dialogDescriptionColor: colors.text_default,
  dialogCloseButtonBorderColor: colors.text_primary,
  dialogCloseButtonTextColor: colors.text_default,
  dialogCloseRingColor: '#ccc',

  checkboxBackgroundColor: colors.background,
  checkboxActiveBackgroundColor: colors.secondary,
  checkboxActiveTextColor: colors.primary,
  checkboxActiveBorderColor: colors.primary,
  checkboxLabelTextColor: colors.text_default,

  accordionSeparatorColor: '#777',
  accordionHeadingColor: colors.text_primary,
  accordionTextColor: colors.text_default,

  separatorColor: '#777'
};


export default function getVariables() {
  return variables;
}