"use client";

import { LOCATIONS } from "@/lib/locations";
import { useDictionary } from "@/components/DictionaryProvider";

interface Step1Props {
  departure: string;
  destination: string;
  onChange: (field: "departure" | "destination", value: string) => void;
  errors: Record<string, string>;
}

const airports = LOCATIONS.filter((l) => l.type === "airport");
const cities = LOCATIONS.filter((l) => l.type === "city");

export default function Step1Route({ departure, destination, onChange, errors }: Step1Props) {
  const dict = useDictionary();
  const sDict = dict.booking.step1;

  return (
    <div className="animate-fadeup">
      <div className="step-header">
        <h2>📍 {sDict.departure} &amp; {sDict.destination}</h2>
      </div>

      <div className="form-group">
        <label className="form-label">
          {sDict.departure} <span className="required">*</span>
        </label>
        <select
          className={`form-select ${errors.departure ? "error" : ""}`}
          value={departure}
          onChange={(e) => onChange("departure", e.target.value)}
        >
          <option value="">— {sDict.departurePlaceholder} —</option>
          <optgroup label="✈️ Aéroports">
            {airports.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="🏙️ Villes">
            {cities.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.departure && (
          <span className="form-error">⚠️ {errors.departure}</span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "4px 0 20px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "var(--purple-100)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => {
            const tmp = departure;
            onChange("departure", destination);
            onChange("destination", tmp);
          }}
        >
          ⇅
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          {sDict.destination} <span className="required">*</span>
        </label>
        <select
          className={`form-select ${errors.destination ? "error" : ""}`}
          value={destination}
          onChange={(e) => onChange("destination", e.target.value)}
        >
          <option value="">— {sDict.destinationPlaceholder} —</option>
          <optgroup label="✈️ Aéroports">
            {airports.map((loc) => (
              <option key={loc.id} value={loc.id} disabled={loc.id === departure}>
                {loc.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="🏙️ Villes">
            {cities.map((loc) => (
              <option key={loc.id} value={loc.id} disabled={loc.id === departure}>
                {loc.name}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.destination && (
          <span className="form-error">⚠️ {errors.destination}</span>
        )}
      </div>
    </div>
  );
}
