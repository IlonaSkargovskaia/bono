"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faCheck,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCauses, fetchData } from "@/store/slices/causesSlice";

const bgColors = [
    "#e4cccc",
    "#d5d4d1",
    "#cbd9d9",
    "#f0e4d7",
    "#d4d9e5",
    "#d7d8de",
    "#e0e5e5",
    "#e1d7e0",
    "#e9e0d4",
];

const preloadImages = (images) => {
    images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
    });
};

const Causes = () => {
    const dispatch = useDispatch();
    const { selectedCauses, causes, loading, error } = useSelector(
        (state) => state.causes
    );

    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            if (selectedCauses.length === 0) {
                dispatch(fetchData());
            }
            setInitialLoad(false);
        }
    }, [dispatch, selectedCauses.length, initialLoad]);

    const handleSelectCause = (cause) => {
        if (selectedCauses.includes(cause)) {
            dispatch(
                setSelectedCauses(
                    selectedCauses.filter((item) => item !== cause)
                )
            );
        } else {
            if (selectedCauses.length < 3) {
                dispatch(setSelectedCauses([...selectedCauses, cause]));
            } else {
                alert("You can only select 3 causes");
            }
        }
    };

    const progress = (selectedCauses.length / 3) * 100;

    const currentCause = selectedCauses[selectedCauses.length - 1];

    useEffect(() => {
        if (selectedCauses.length > 0) {
            console.log(selectedCauses);
        }
    }, [selectedCauses]);

    return (
        <div className="container">
            <div className="main-container">
                <div className="back-button-container">
                    <Link href="/" passHref>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="back-button"
                        />
                    </Link>
                </div>
                <div className="title-container">
                    <h1>Let&apos;s build your portfolio</h1>
                    <p>Pick the 3 causes that you mostly care about:</p>
                </div>
                {loading ? (
                    <div className="preloader">
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="causes-list">
                        {causes.map((item, index) => (
                            <div
                                key={item.id}
                                className={`cause-item ${
                                    selectedCauses.includes(item)
                                        ? "selected"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor:
                                        bgColors[index % bgColors.length],
                                }}
                                onClick={() => handleSelectCause(item)}
                            >
                                <h2>{item.title}</h2>
                                <div className="icon-container">
                                    <FontAwesomeIcon
                                        icon={
                                            selectedCauses.includes(item)
                                                ? faCheck
                                                : faPlus
                                        }
                                        className="icon"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {currentCause && (
                    <div
                        className={`cause-details-container ${
                            currentCause ? "show" : ""
                        }`}
                    >
                        <div className="cause-details">
                            <Image
                                src={currentCause.icon}
                                alt={currentCause.title}
                                width={80}
                                height={80}
                                priority
                            />
                            <h3>{currentCause.title}</h3>
                            <p>{currentCause.description}</p>
                        </div>
                    </div>
                )}

                <div className="progress-block">
                    <div className="progress-text">
                        {selectedCauses.length} / 3 causes added
                    </div>
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                

                <Link href="/login" passHref>
                    <button
                        disabled={selectedCauses.length !== 3}
                        className="main-button"
                    >
                        Continue
                    </button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Causes;
