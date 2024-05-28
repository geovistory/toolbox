CREATE TRIGGER notify_modification
  AFTER INSERT OR DELETE OR UPDATE ON system.config
  FOR EACH STATEMENT
  EXECUTE PROCEDURE commons.notify_modification_trigger ();

