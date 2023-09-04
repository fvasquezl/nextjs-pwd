interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: object;
  company: string;
}

interface MyParameters {
  user: User;
  id: number;
  title: string;
  body: string;
}

export default function Category(categoryData: MyParameters) {
  console.log(categoryData);
  return (
    <div className="bg-white shadow sm:rounded-lg mt-3">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {categoryData.id} .....
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{categoryData.title}</p>
            </div>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Change plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
