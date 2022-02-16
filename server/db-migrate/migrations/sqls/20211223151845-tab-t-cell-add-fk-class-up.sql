/* Replace with your SQL commands */
ALTER TABLE tables.cell
  ADD COLUMN fk_class INT NOT NULL DEFAULT 521;

ALTER TABLE tables.cell_vt
  ADD COLUMN fk_class INT;

