import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SketchPicker, type ColorResult } from "react-color";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getCoffeeLog, updateCoffeeLog } from "../api/coffeeLog"; 
import type { CoffeeLogRequest } from "../types";
import "./CoffeeWritePage.css";

const CoffeeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [variety, setVariety] = useState("");
  const [processing, setProcessing] = useState("");
  const [roastingPoint, setRoastingPoint] = useState("Medium");
  const [comment, setComment] = useState("");
  const [moodColors, setMoodColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState("#8b4513");
  const [flavorTags, setFlavorTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await getCoffeeLog(Number(id));
        
        setName(data.name);
        setCountry(data.country || "");
        setRegion(data.region || "");
        setVariety(data.variety || "");
        setProcessing(data.processing || "");
        setRoastingPoint(data.roastingPoint || "Medium");
        setComment(data.comment || "");

        if (data.moodColors) {
            setMoodColors(data.moodColors.split(","));
        }
        if (data.flavorNotes) {
            setFlavorTags(data.flavorNotes.split(","));
        }

      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("기록을 불러올 수 없습니다.");
        navigate("/hobby/coffee");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);


  const handleAddColor = () => {
    if (moodColors.length >= 3) {
      alert("무드 컬러는 최대 3개까지 선택 가능합니다.");
      return;
    }
    setMoodColors([...moodColors, tempColor]);
    setShowColorPicker(false);
  };

  const handleRemoveColor = (indexToRemove: number) => {
    setMoodColors(moodColors.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(",", "");
      if (newTag && !flavorTags.includes(newTag)) {
        setFlavorTags([...flavorTags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFlavorTags(flavorTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;
    if (moodColors.length === 0) {
      alert("최소 1개의 무드 컬러를 선택해주세요!");
      return;
    }

    const requestData: CoffeeLogRequest = {
      name,
      country,
      region,
      variety,
      processing,
      roastingPoint,
      moodColors: moodColors.join(","), 
      flavorNotes: flavorTags.join(","),
      comment
    };

    try {
      await updateCoffeeLog(Number(id), requestData);
      alert("수정이 완료되었습니다!");
      navigate(`/hobby/coffee/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <div className="write-container">
        <div className="write-header">
          {/* 제목 변경 */}
          <h1>커피 기록 수정</h1>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>원두 이름 <span className="required-mark">*</span></label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>산지 (Country)</label>
              <input 
                type="text" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>지역/농장 (Region)</label>
              <input 
                type="text" 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
             <div className="form-group" style={{ flex: 1 }}>
              <label>품종 (Variety)</label>
              <input type="text" value={variety} onChange={(e) => setVariety(e.target.value)} />
            </div>
             <div className="form-group" style={{ flex: 1 }}>
              <label>가공방식 (Processing)</label>
              <input type="text" value={processing} onChange={(e) => setProcessing(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>로스팅 포인트</label>
            <select value={roastingPoint} onChange={(e) => setRoastingPoint(e.target.value)}>
              <option value="Light">Light (약배전)</option>
              <option value="Medium-Light">Medium-Light (중약배전)</option>
              <option value="Medium">Medium (중배전)</option>
              <option value="Medium-Dark">Medium-Dark (중강배전)</option>
              <option value="Dark">Dark (강배전)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mood Colors (최대 3개) <span className="required-mark">*</span></label>
            <div className="color-picker-container">
              {moodColors.map((color, index) => (
                <div 
                  key={index} 
                  className="selected-color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => handleRemoveColor(index)}
                >
                    <div className="remove-color-mark">x</div>
                </div>
              ))}

              {moodColors.length < 3 && (
                <div className="add-color-btn" onClick={() => setShowColorPicker(true)}>+</div>
              )}

              {showColorPicker && (
                <div className="popover">
                  <div className="cover" onClick={() => setShowColorPicker(false)} />
                  <SketchPicker 
                    color={tempColor}
                    onChange={(color: ColorResult) => setTempColor(color.hex)}
                    disableAlpha={true} 
                  />
                  <div style={{ marginTop: '10px', textAlign: 'right', background: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', position: 'relative', zIndex: 2 }}>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleAddColor(); }}
                      style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      선택 완료
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Flavor Notes</label>
            <div className="tags-input-container">
              {flavorTags.map((tag, index) => (
                <span key={index} className="tag-item">
                  # {tag}
                  <span className="tag-remove" onClick={() => handleRemoveTag(tag)}>×</span>
                </span>
              ))}
              <input 
                type="text" 
                className="tag-input"
                placeholder="태그 입력"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>
          </div>

          <div className="form-group">
            <label>한줄 평 (Comment)</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>취소</button>
            <button type="submit" className="btn-submit">수정 완료</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CoffeeEditPage;