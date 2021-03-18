/**
 * Contains configuration of keys used in the the system-schema
 * that are relevant for the app logic.
 *
 * Example: the ui-context keys are used to query the order of properties in different contexts
 */
export class ProConfig {

  /**
   * Primary Key of Namespace "Geovistory Ongoing"
   */
  // This project is cloned when a new project is created
  static readonly PK_PROJECT_OF_TEMPLATE_PROJECT = 173

  // This project contains default cofigs: class_configs, labels
  static readonly PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT = 375669

  // This project is the sandbox project that is cloned when a new account is created
  static readonly PK_PROJECT_OF_SANDBOX_PROJECT = 375232
}
