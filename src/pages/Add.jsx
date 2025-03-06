import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Api base url
import api from "../api";

// Axios
import axios from "axios";

// Components
import Icon from "../components/Icon";

// Data
import secretKey from "../data/secretKey";

// Hooks
import useTelegram from "../hooks/useTelegram";

// Utils
import { encryptId, formatDate, reloadPage } from "../utils";

// Images
import settingsIcon from "../assets/images/icons/settings.svg";

const Add = () => {
  const { user, tg } = useTelegram();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => tg.setHeaderColor("#f5f5f5"), []);
  const { first_name: firstName, photo_url: avatar, username } = user || {};

  // Submit form
  const handleAddReport = (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const getInputValue = (name) => e.target.querySelector(name)?.value?.trim();

    const today = new Date();
    const type = getInputValue("#type");
    const amount = getInputValue("#amount");
    const category = getInputValue("#category");
    const description = getInputValue("#description");
    const checkbox = e.target.querySelector("#checkbox").checked;

    const apiUrl = `${api}?userId=${encryptId(
      user?.id || 298444246,
      secretKey
    )}&method=post&data=${encodeURIComponent(
      JSON.stringify([
        formatDate(today),
        type || "Chiqim",
        category || "Mavjud emas",
        amount || 0,
        description || "—",
      ])
    )}&stableIncome=${checkbox}`;

    axios
      .post(apiUrl)
      .then(({ data: res }) => {
        if (res?.success) {
          alert(res?.message || "Muvaffaqiyatli!");
          reloadPage();
        } else alert("Xatolik!");
      })
      .catch(() => alert("Xatolik!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="pb-10">
      {/* Top */}
      <div className="sticky top-0 inset-x-0 z-10 bg-gradient-to-b from-[#f5f5f5] to-white border-b">
        <div className="container py-3.5">
          {/* Profile wrapper */}
          <div className="flex items-center justify-between gap-3.5 rounded-xl">
            {/* Details */}
            <div className="flex items-center gap-3.5 w-[calc(100%-54px)] xs:w-[calc(100%-62px)]">
              <Icon
                alt="Avatar"
                src={avatar || ""}
                className="size-12 bg-primary rounded-full xs:size-14"
              />

              <div className="w-[calc(100%-62px)] space-y-1 xs:w-[calc(100%-70px)]">
                {/* First name */}
                <b className="block truncate xs:text-[17px]">
                  {firstName || "Foydalanuvchi"}
                </b>

                {/* Username */}
                <p className="truncate text-neutral-500">
                  @{username || "foydalanuvchi_nomi"}
                </p>
              </div>
            </div>

            {/* Settings page link */}
            <Link
              to="/sozlamalar"
              className="flex items-center justify-center shrink-0 size-10 bg-[#f5f5f5] border border-neutral-100 rounded-full xs:size-12"
            >
              <Icon
                size={28}
                src={settingsIcon}
                alt="Settings icon"
                className="size-6 xs:size-7"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="container pt-5">
        <form onSubmit={handleAddReport} className="space-y-5">
          {/* Date */}
          <div className="space-y-2.5">
            <label htmlFor="date">Sana</label>

            {/* Input */}
            <select disabled name="date" id="date">
              <option value="today">Bugun</option>
            </select>
          </div>

          {/* Type */}
          <div className="space-y-2.5">
            <label htmlFor="type">Tur</label>

            {/* Input */}
            <select disabled={isLoading} name="type" id="type">
              <option value="Kirim">Kirim</option>
              <option value="Chiqim">Chiqim</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-2.5">
            <label htmlFor="category">Turkum *</label>

            {/* Input */}
            <input
              required
              type="text"
              id="category"
              name="category"
              disabled={isLoading}
              placeholder="1 Martalik ish, Onlayn ish..."
            />
          </div>

          {/* Amount */}
          <div className="space-y-2.5">
            <label htmlFor="amount">Qiymat *</label>

            {/* Input */}
            <input
              min={0}
              required
              id="amount"
              name="amount"
              type="number"
              disabled={isLoading}
              placeholder="100,000"
            />
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <label htmlFor="description">Izoh</label>

            {/* Input */}
            <textarea
              id="description"
              name="description"
              disabled={isLoading}
              placeholder="Kwork'dan Veb-sayt olindi"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="checkbox"
              type="checkbox"
              name="checkbox"
              className="size-5"
            />
            <label htmlFor="checkbox">To'liq daromad sifatida belgilash</label>
          </div>

          {/* Submit button */}
          <button
            disabled={isLoading}
            className={`${
              isLoading ? "animate-pulse" : ""
            } w-full h-12 bg-secondary text-white rounded-lg`}
          >
            Qo'shish
            {isLoading && "..."}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Add;
