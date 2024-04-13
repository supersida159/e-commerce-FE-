'use client';

const addAddress = () => {
  <div className="mx-6 mt-6 md:mx-0 md:mt-3">
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:w-1/4">
        <div className="text-center">
          <i
            id="animationDemo"
            data-mdb-animation="slide-right"
            data-mdb-toggle="animation"
            data-mdb-animation-reset="true"
            data-mdb-animation-start="onScroll"
            data-mdb-animation-on-scroll="repeat"
            className="fas fa-shipping-fast text-3xl text-white"
          ></i>
          <h3 className="mt-3 text-white">Welcome</h3>
          <p className="text-white">
            You are 30 seconds away from completing your order!
          </p>
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-white btn-rounded back-button"
          >
            Go back
          </button>
        </div>
      </div>
      <div className="flex justify-center md:w-3/4">
        <div className="w-full max-w-md">
          <div className="card card-custom pb-4">
            <div className="card-body mx-5 mt-0">
              <div className="mb-3 mt-3 pb-2 text-center">
                <h4 className="text-gray-700">Delivery Details</h4>
              </div>
              <form className="mb-0">
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form9Example1"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="form9Example1">
                        First name
                      </label>
                    </div>
                  </div>
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form9Example2"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="form9Example2">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form9Example3"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="form9Example3">
                        City
                      </label>
                    </div>
                  </div>
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form9Example4"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="form9Example4">
                        Zip
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form9Example6"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="form9Example6">
                        Address
                      </label>
                    </div>
                  </div>
                  <div>
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="email"
                        id="typeEmail"
                        className="form-control input-custom"
                      />
                      <label className="form-label" htmlFor="typeEmail">
                        Email
                      </label>
                    </div>
                  </div>
                </div>
                <div className="float-right">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-rounded"
                    style={{ backgroundColor: '#0062CC' }}
                  >
                    Place order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default addAddress;
