import { useTranslation } from "react-i18next";
// import UserCard from "../../components/userCard";

const Favourite = () => {
  const { t } = useTranslation();

  return (
    <div className="py-32">
      <h1>Sevimlilar</h1>
    </div>
    // <div
    //   id="anketa"
    //   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    // >
    //   {allUsers.length > 0 ? (
    //     allUsers.map((user, index) => (
    //       <UserCard
    //         key={`${user.id}-${index}`}
    //         user={user}
    //         gender={user.gender}
    //       />
    //     ))
    //   ) : (
    //     <div className="col-span-full text-center text-lg text-gray-500">
    //       {t("home.SecondHomePageSearch.noUsersMessage")}
    //     </div>
    //   )}
    // </div>
  );
};

export default Favourite;
