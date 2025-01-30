import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import { useTranslation } from "react-i18next";
import { useStore } from "../../../../../../store/store";

// Иконка поиска
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const SecondHomeSearchForm = forwardRef(
  (
    {
      onSearch,
      setIsSearchActive,
      isSubmitted,
      setIsSubmitted,
      isSubmittedAge,
      setIsSubmittedAge,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { user } = useStore();

    // Устанавливаем начальное значение gender на основе пола пользователя
    const [gender, setGender] = useState(() => {
      const savedGender = localStorage.getItem("searchFormGender");
      if (savedGender) return savedGender;
      
      // Если нет сохраненного значения, устанавливаем противоположный пол
      return user.gender === "FEMALE" ? "gender=MALE" : "gender=FEMALE";
    });

    const [minAge, setMinAge] = useState(() => {
      return parseInt(localStorage.getItem("searchFormMinAge")) || 18;
    });
    const [maxAge, setMaxAge] = useState(() => {
      return parseInt(localStorage.getItem("searchFormMaxAge")) || 90;
    });
    const [location, setLocation] = useState(() => {
      return localStorage.getItem("searchFormLocation") || "";
    });
    const [maritalStatus, setMaritalStatus] = useState(() => {
      return localStorage.getItem("searchFormMaritalStatus") || "";
    });

    const [ageError, setAgeError] = useState(false);

    // При изменении пользователя обновляем gender
    useEffect(() => {
      if (user && !localStorage.getItem("searchFormGender")) {
        const newGender = user.gender === "FEMALE" ? "gender=MALE" : "gender=FEMALE";
        setGender(newGender);
        localStorage.setItem("searchFormGender", newGender);
      }
    }, [user]);

    // Очищаем localStorage только при закрытии вкладки/сайта
    useEffect(() => {
      const handleUnload = () => {
        // Проверяем, что это действительно закрытие, а не обновление
        if (
          !window.performance.navigation.type ===
          window.performance.navigation.TYPE_RELOAD
        ) {
          localStorage.removeItem("searchFormGender");
          localStorage.removeItem("searchFormMinAge");
          localStorage.removeItem("searchFormMaxAge");
          localStorage.removeItem("searchFormLocation");
          localStorage.removeItem("searchFormMaritalStatus");
        }
      };

      window.addEventListener("unload", handleUnload);
      return () => {
        window.removeEventListener("unload", handleUnload);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        const newGender = user.gender === "FEMALE" ? "gender=MALE" : "gender=FEMALE";
        setGender(newGender);
        localStorage.setItem("searchFormGender", newGender);
        
        setMinAge(18);
        setMaxAge(90);
        setLocation("");
        setMaritalStatus("");
        // Очищаем localStorage при сбросе
        localStorage.removeItem("searchFormMinAge");
        localStorage.removeItem("searchFormMaxAge");
        localStorage.removeItem("searchFormLocation");
        localStorage.removeItem("searchFormMaritalStatus");
      },
    }));

    // Сохраняем значения в localStorage при изменении
    const handleGenderChange = (newGender) => {
      setGender(newGender);
      localStorage.setItem("searchFormGender", newGender);
    };

    const handleMinAgeChange = (value) => {
      setMinAge(value);
      localStorage.setItem("searchFormMinAge", value);
      setAgeError(false);
    };

    const handleMaxAgeChange = (value) => {
      setMaxAge(value);
      localStorage.setItem("searchFormMaxAge", value);
      setAgeError(false);
    };

    const handleLocationChange = (value) => {
      setLocation(value);
      localStorage.setItem("searchFormLocation", value);
    };

    const handleMaritalStatusChange = (value) => {
      setMaritalStatus(value);
      localStorage.setItem("searchFormMaritalStatus", value);
    };

    const cities = [
      {
        value: "",
        label: t("home.SecondHomePageSearch.form.city.options.all"),
      },
      {
        value: "TOSHKENT",
        label: t("home.SecondHomePageSearch.form.city.options.Tashkent"),
      },
      {
        value: "ANDIJON",
        label: t("home.SecondHomePageSearch.form.city.options.Andijan"),
      },
      {
        value: "BUXORO",
        label: t("home.SecondHomePageSearch.form.city.options.Bukhara"),
      },
      {
        value: "FARGONA",
        label: t("home.SecondHomePageSearch.form.city.options.Fergana"),
      },
      {
        value: "JIZZAX",
        label: t("home.SecondHomePageSearch.form.city.options.Jizzakh"),
      },
      {
        value: "XORAZM",
        label: t("home.SecondHomePageSearch.form.city.options.Xorazm"),
      },
      {
        value: "NAMANGAN",
        label: t("home.SecondHomePageSearch.form.city.options.Namangan"),
      },
      {
        value: "NAVOIY",
        label: t("home.SecondHomePageSearch.form.city.options.Navoiy"),
      },
      {
        value: "QASHQADARYO",
        label: t("home.SecondHomePageSearch.form.city.options.Qashqadaryo"),
      },
      {
        value: "SAMARQAND",
        label: t("home.SecondHomePageSearch.form.city.options.Samarkand"),
      },
      {
        value: "SIRDARYO",
        label: t("home.SecondHomePageSearch.form.city.options.Sirdaryo"),
      },
      {
        value: "SURXONDARYO",
        label: t("home.SecondHomePageSearch.form.city.options.Surxondaryo"),
      },
      {
        value: "QORAQALPOGISTON",
        label: t("home.SecondHomePageSearch.form.city.options.Karakalpakstan"),
      },
    ];

    const maleMaritalStatuses = [
      {
        value: "",
        label: t("home.SecondHomePageSearch.form.maritalStatus.male.all"),
      },
      {
        value: "SINGLE",
        label: t("home.SecondHomePageSearch.form.maritalStatus.male.single"),
      },
      {
        value: "DIVORCED",
        label: t("home.SecondHomePageSearch.form.maritalStatus.male.divorced"),
      },
      {
        value: "MARRIED_SECOND",
        label: t(
          "home.SecondHomePageSearch.form.maritalStatus.male.married_second"
        ),
      },
    ];

    const femaleMaritalStatuses = [
      {
        value: "",
        label: t("home.SecondHomePageSearch.form.maritalStatus.female.all"),
      },
      {
        value: "SINGLE",
        label: t("home.SecondHomePageSearch.form.maritalStatus.female.single"),
      },
      {
        value: "DIVORCED",
        label: t(
          "home.SecondHomePageSearch.form.maritalStatus.female.divorced"
        ),
      },
    ];

    const getMaritalStatusOptions = () =>
      gender === "gender=MALE" ? maleMaritalStatuses : femaleMaritalStatuses;

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true);

      // Проверяем, выбран ли пол
      if (!gender) {
        return;
      }

      const minAgeNum = Number(minAge);
      const maxAgeNum = Number(maxAge);

      // Проверяем возраст
      if (minAgeNum < 18 || maxAgeNum > 99 || minAgeNum > maxAgeNum) {
        setAgeError(true);
        return;
      }

      setAgeError(false);
      // Вызываем функцию поиска, переданную из родителя
      onSearch(gender, minAge, maxAge, location, maritalStatus);
      setIsSearchActive(true);
    };

    return (
      <form
        id="search"
        data-aos="flip-up"
        data-aos-offset="50"
        onSubmit={handleSubmit}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8 focus:outline-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Selection */}
          <div data-aos-delay="500" data-aos="fade-right" data-aos-offset="50">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("home.SecondHomePageSearch.form.gender.label")}{" "}
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-4">
              {user.gender === "FEMALE" ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("gender=MALE")}
                    className={`flex-1 py-2 px-4 rounded-full border ${"bg-rose-500 text-white border-rose-500"} transition-colors duration-300`}
                  >
                    {t("home.SecondHomePageSearch.form.gender.male")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleGenderChange("gender=FEMALE")}
                    className={`flex-1 py-2 px-4 rounded-full border ${"bg-rose-500 text-white border-rose-500"} transition-colors duration-300`}
                  >
                    {t("home.SecondHomePageSearch.form.gender.female")}
                  </button>
                </>
              )}
            </div>
            {isSubmitted && !gender && (
              <p className="text-sm text-rose-500 text-center mt-2">
                {t("home.SecondHomePageSearch.form.genderError")}
              </p>
            )}
          </div>

          {/* Age Range */}
          <div data-aos-delay="500" data-aos="fade-left" data-aos-offset="50">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("home.SecondHomePageSearch.form.age.label")}
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="18"
                max="90"
                value={minAge}
                maxLength={2}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleMinAgeChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <span>-</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="18"
                max="90"
                maxLength={2}
                value={maxAge}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleMaxAgeChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            {ageError && (
                <p className="text-sm text-rose-500 text-center mt-2">
                  {t("auth.FormOne.Validation.age.default")}
                </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Location */}
          <div data-aos-delay="500" data-aos="fade-right" data-aos-offset="50">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("home.SecondHomePageSearch.form.city.label")}
            </label>
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* Marital Status */}
          <div data-aos-delay="500" data-aos="fade-left" data-aos-offset="50">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("home.SecondHomePageSearch.form.maritalStatus.label")}
            </label>
            <select
              value={maritalStatus}
              onChange={(e) => handleMaritalStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {getMaritalStatusOptions().map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="mt-6 text-center"
          data-aos-delay="500"
          data-aos="flip-down"
          data-aos-offset="50"
        >
          <button
            type="submit"
            className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <SearchIcon />
            <span>{t("home.SecondHomePageSearch.form.search")}</span>
          </button>
        </div>
      </form>
    );
  }
);

export default SecondHomeSearchForm;
