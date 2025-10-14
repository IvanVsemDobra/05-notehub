import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import css from "./Modal.module.css";
import type { NoteFormData } from "../../types/note";

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: NoteFormData;
  onSubmit: (values: NoteFormData) => void;
  isEdit?: boolean;
}

const NoteSchema = Yup.object({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов’язкове поле"),
  content: Yup.string().max(500, "Максимум 500 символів"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Некоректний тег"
    )
    .required("Оберіть тег"),
});

export default function NoteFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues = { title: "", content: "", tag: "Todo" },
  isEdit = false,
}: NoteFormModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      title={isEdit ? "Редагувати нотатку" : "Створити нотатку"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={NoteSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field
                id="title"
                name="title"
                type="text"
                className={css.input}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isEdit ? "Save changes" : "Create note"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
