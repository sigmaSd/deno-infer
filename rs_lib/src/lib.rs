use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum MatcherType {
  App,
  Archive,
  Audio,
  Book,
  Doc,
  Font,
  Image,
  Text,
  Video,
  Custom,
}
impl From<infer::MatcherType> for MatcherType {
  fn from(value: infer::MatcherType) -> Self {
    match value {
      infer::MatcherType::App => Self::App,
      infer::MatcherType::Archive => Self::Archive,
      infer::MatcherType::Audio => Self::Audio,
      infer::MatcherType::Book => Self::Book,
      infer::MatcherType::Doc => Self::Doc,
      infer::MatcherType::Font => Self::Font,
      infer::MatcherType::Image => Self::Image,
      infer::MatcherType::Text => Self::Text,
      infer::MatcherType::Video => Self::Video,
      infer::MatcherType::Custom => Self::Custom,
    }
  }
}

#[wasm_bindgen]
pub struct Type(infer::Type);

#[wasm_bindgen]
impl Type {
  pub fn extension(&self) -> String {
    self.0.extension().into()
  }
  pub fn matcher_type(&self) -> MatcherType {
    self.0.matcher_type().into()
  }
  pub fn mime_type(&self) -> String {
    self.0.mime_type().into()
  }
}

#[wasm_bindgen]
pub fn get(buf: &[u8]) -> Option<Type> {
  infer::get(buf).map(Type)
}
