"use client";

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps =
  | ({
      as?: "input";
      label: string;
      required?: boolean;
    } & InputHTMLAttributes<HTMLInputElement>)
  | ({
      as: "textarea";
      label: string;
      required?: boolean;
      rows?: number;
    } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({
      as: "select";
      label: string;
      required?: boolean;
      options: Option[];
    } & SelectHTMLAttributes<HTMLSelectElement>)
  | ({
      as: "radio";
      label: string;
      required?: boolean;
      name: string;
      options: Option[];
    } & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name">)
  | ({
      as: "checkbox";
      label: string;
      required?: boolean;
      name: string;
      options?: Option[];
    } & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name">);

export default function FormField(props: FormFieldProps) {

  const { label, required = false } = props;

  const baseInput =
    "w-full rounded-xl border border-gray-300 px-4 py-3 " +
    "text-black placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition";

  return (
    <div className="space-y-2">

      {/* LABEL */}
      <label className="block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* SELECT */}
      {props.as === "select" ? (
        <select {...props} className={baseInput}>
          <option value="">Selecione...</option>

          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )

      /* TEXTAREA */
      : props.as === "textarea" ? (
        <textarea
          {...props}
          rows={props.rows || 3}
          className={`${baseInput} resize-y`}
        />
      )

      /* RADIO */
      : props.as === "radio" ? (
        <div className="flex flex-wrap gap-6 pt-2">

          {props.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer text-gray-900"
            >
              <input
                type="radio"
                name={props.name}
                value={option.value}
                className="accent-emerald-600 w-4 h-4"
                required={required}
              />

              {option.label}
            </label>
          ))}

        </div>
      )

      /* CHECKBOX */
      : props.as === "checkbox" ? (
        props.options ? (
          <div className="flex flex-wrap gap-4 pt-2">

            {props.options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer text-gray-900"
              >
                <input
                  type="checkbox"
                  name={props.name}
                  value={option.value}
                  className="accent-emerald-600 w-4 h-4"
                />

                {option.label}
              </label>
            ))}

          </div>
        ) : (
          <label className="flex items-center gap-2 cursor-pointer text-gray-900">
            <input
              type="checkbox"
              name={props.name}
              className="accent-emerald-600 w-4 h-4"
            />
            {label}
          </label>
        )
      )

      /* INPUT PADRÃO */
      : (
        <input {...props} className={baseInput} />
      )}

    </div>
  );
}