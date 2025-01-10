import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css";
import { useEffect } from "react";

enum FORM_FIELDS {
  EXAM_NAME = "name",
  ACADEMIC_YEAR = "academicYear",
  COURSE = "course",
  SEMESTER = "semester",
  EXAM_TYPE = "examType",
  NOTE = "note",
  STATUS = "status",
}

const TextEditor = ({ onChange }: { onChange: any }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [onChange, quill]);

  return <div ref={quillRef} className="w-full border-2" />;
};

export default TextEditor;
