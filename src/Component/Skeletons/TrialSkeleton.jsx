import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


const cardStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "28px",
};

const topRowStyles = {
  display: "grid",
  gridTemplateColumns: "2.2fr 1fr",
  gap: "10px",
  alignItems: "start",
};

const infoStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const badgeListStyles = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
};

const badgeStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "18px 20px",
};

const actionStyles = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const investigatorRowStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const investigatorCardStyles = {
  display: "flex",
  gap: "16px",
  padding: "20px",
  alignItems: "center",
};



const TrialSkeleton = () => (
  <SkeletonTheme color="#5e6c77" highlightColor="#a9b7c1" inline={true}>
    <div style={cardStyles}>
      <div style={topRowStyles}>
        <div style={infoStyles}>
          <Skeleton height={22} width={140} />
          <Skeleton height={38} width="70%" style={{ marginTop: 5, marginBottom: 5 }} />
          <Skeleton count={5} />
          <Skeleton height={20} width={120} style={{ marginTop: 5 }} />
        </div>
        <div style={badgeListStyles}>
          <div style={badgeStyles}>
            <Skeleton height={18} width={110} />
            <Skeleton height={28} width={90} style={{ marginTop: 5 }} />
          </div>
          <div style={badgeStyles}>
            <Skeleton height={18} width={110} />
            <Skeleton height={28} width={90} style={{ marginTop: 5 }} />
          </div>
        </div>
      </div>

      <div>
        <Skeleton height={24} width={220} style={{ marginTop: 5 }} />
        <div style={investigatorRowStyles}>
          {[1, 2].map((index) => (
            <div style={investigatorCardStyles} key={index}>
              <Skeleton circle height={68} width={68} />
              <div style={{ flex: 1, display: "grid", gap: "10px" }}>
                <Skeleton height={20} width="80%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="70%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={actionStyles}>
        <Skeleton height={44} width={140} />
        <Skeleton height={44} width={140} />
      </div>
    </div>
  </SkeletonTheme>
);

export default function TrialSkeletonPage() {
  return (
    <>
      <TrialSkeleton />
    </>
  );
}