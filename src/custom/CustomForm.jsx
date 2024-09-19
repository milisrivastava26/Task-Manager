/* eslint-disable react/prop-types */

import CustomButton from "./CustomButton";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import SearchableDropdown from "./SearchableDropdown";

const CustomForm = ({ isMode, handler, initialValue }) => {
    // Validation Schema using Yup
    const validationSchema = yup.object().shape({
        taskName: yup.string().required("Task Name is required"),
        description: yup.string().required("Description is required"),
        status: yup.string().required("Please select a status"),
        remarks: yup.string().required("Remark is required").matches(/^[a-zA-Z'-\s]*$/, "Only characters from A-Z and a-z allowed"),
    });

    // Populate form fields when in edit mode
    const initialValues = {
        taskName: isMode === "edit" ? initialValue?.taskName?.stringValue || "" : "",
        description: isMode === "edit" ? initialValue?.description?.stringValue || "" : "",
        status: isMode === "edit" ? initialValue?.status?.stringValue || "" : "",
        remarks: isMode === "edit" ? initialValue?.remarks?.stringValue || "" : "",
    };
    
    // status on mode edit
    const statusState = initialValue?.status?.stringValue;

    return (
        <div className="w-full flex justify-center items-center h-screen px-4 sm:px-8 z-1">
            <div className="bg-blue-950 text-white py-8 px-16 rounded-lg shadow-lg w-full max-w-3xl ml-[15%]">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isMode === "edit" ? "Edit Task" : "Add New Task"}
                </h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handler(values)}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="grid gap-6">
                            {/* Task ID (Only for edit mode) */}
                            {isMode === "edit" && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <label htmlFor="taskId" className="text-lg font-medium w-full sm:w-32">
                                        Task ID:
                                    </label>
                                    <Field
                                        type="text"
                                        name="taskId"
                                        className="p-2 flex-grow rounded border text-black cursor-not-allowed w-full"
                                        value={initialValue.id || ""}
                                        disabled
                                    />
                                </div>
                            )}

                            {/* Task Name */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="taskName" className="text-lg font-medium w-full sm:w-32">
                                    Task Name:
                                </label>
                                <div className="flex flex-col w-full">
                                    <Field
                                        type="text"
                                        name="taskName"
                                        className="p-2 flex-grow rounded border border-gray-300 text-black"
                                        placeholder="Enter task name"
                                    />
                                    {errors.taskName && touched.taskName && (
                                        <div className="text-red-500 text-left">{errors.taskName}</div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="description" className="text-lg font-medium w-full sm:w-32">
                                    Description:
                                </label>
                                <div className="flex flex-col w-full">
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={4}
                                        className="p-2 flex-grow rounded border border-gray-300 text-black"
                                        placeholder="Enter description"
                                    />
                                    {errors.description && touched.description && (
                                        <div className="text-red-500 text-left">{errors.description}</div>
                                    )}
                                </div>
                            </div>

                            {/* Status Select */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="status" className="text-lg font-medium w-full sm:w-32">
                                    Status:
                                </label>
                                <div className="flex flex-col w-full">
                                    <SearchableDropdown setFieldValue={setFieldValue} initialStatus={statusState} isMode={isMode}/>
                                    {errors.status && touched.status && (
                                        <div className="text-red-500 text-left">{errors.status}</div>
                                    )}
                                </div>
                            </div>

                            {/* Remarks */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <label htmlFor="remarks" className="text-lg font-medium w-full sm:w-32">
                                    Remarks:
                                </label>
                                <div className="flex flex-col w-full">
                                    <Field
                                        type="text"
                                        name="remarks"
                                        className="p-2 flex-grow rounded border border-gray-300 text-black"
                                        placeholder="Enter remarks"
                                    />
                                    {errors.remarks && touched.remarks && (
                                        <div className="text-red-500 text-left">{errors.remarks}</div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <CustomButton isMode={isMode} handler={undefined} />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CustomForm;
