import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserAction,
  userProfileAction,
} from "../../redux/slices/users/usersSlices";
import DisabledButton from "../../components/DisabledButton";
import { useHistory } from "react-router";
import { updateUserAction } from "../../redux/slices/users/usersSlices";

//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
});

const UpdateProfile = ({ location: { state } }) => {
  const history = useHistory();
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, userAuth } = user;
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email,
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
    },
    onSubmit: (values) => {
      dispatch(updateUserAction(values));
    },
    validationSchema: formSchema,
  });
  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Update Profile</span>
                  {/* <h4 className="mb-4 fw-light">
                    Hi, {data?.data?.firstname} Do you want to update your
                    profile
                  </h4> */}

                  {/* Display income Err */}
                  {/* {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null} */}
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.firstname}
                      onBlur={formik.handleBlur("firstname")}
                      onChange={formik.handleChange("firstname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter firstname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.lastname}
                      onBlur={formik.handleBlur("lastname")}
                      onChange={formik.handleChange("lastname")}
                      className="form-control"
                      type="text"
                      placeholder="Enter lastname"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      onChange={formik.handleChange("email")}
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button type="submit" class="btn btn-warning">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
